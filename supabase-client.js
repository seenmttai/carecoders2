// Supabase integration for storing medical reports
const supabaseUrl = 'https://izsggdtdiacxdsjjncdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c2dnZHRkaWFjeGRzampuY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTEzNjUsImV4cCI6MjA1NDE2NzM2NX0.FVKBJG-TmXiiYzBDjGIRBM2zg-DYxzNP--WM6q2UMt0';

// Initialize Supabase client
async function initSupabase() {
  if (!window.supabase) {
    // Load the Supabase client if not already loaded
    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.8/dist/umd/supabase.min.js');
  }
  return window.supabase.createClient(supabaseUrl, supabaseKey);
}

// Helper to load external scripts
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Upload PDF to Supabase Storage and update medicaldata table
async function uploadReportToSupabase(pdfBlob, patientData) {
  try {
    const supabase = await initSupabase();
    
    // Create a file name with redacted patient info
    const timestamp = new Date().getTime();
    const fileName = `report_${timestamp}.pdf`;
    
    // Upload file to 'files' bucket
    const { data: fileData, error: uploadError } = await supabase
      .storage
      .from('files')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        cacheControl: '3600'
      });
    
    if (uploadError) throw uploadError;
    
    // Get the public URL for the uploaded file
    const { data: urlData } = await supabase
      .storage
      .from('files')
      .getPublicUrl(fileName);
    
    if (!urlData.publicUrl) throw new Error('Failed to get public URL');
    
    // Create a record in the medicaldata table with only the URL
    const { data: recordData, error: recordError } = await supabase
      .from('medicaldata')
      .insert([{ url: urlData.publicUrl }]);
    
    if (recordError) throw recordError;
    
    return urlData.publicUrl;
    
  } catch (error) {
    console.error('Supabase error:', error);
    throw error;
  }
}