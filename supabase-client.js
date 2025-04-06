const supabaseUrl = 'https://izsggdtdiacxdsjjncdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c2dnZHRkaWFjeGRzampuY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTEzNjUsImV4cCI6MjA1NDE2NzM2NX0.FVKBJG-TmXiiYzBDjGIRBM2zg-DYxzNP--WM6q2UMt0';

async function initSupabase() {
  if (!window.supabase) {

    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.8/dist/umd/supabase.min.js');
  }
  return window.supabase.createClient(supabaseUrl, supabaseKey);
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function uploadReportToSupabase(pdfBlob, patientData) {
  try {
    const supabase = await initSupabase();

    const timestamp = new Date().getTime();
    const fileName = `report_${timestamp}.pdf`;

    const { data: fileData, error: uploadError } = await supabase
      .storage
      .from('files')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        cacheControl: '3600'
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = await supabase
      .storage
      .from('files')
      .getPublicUrl(fileName);

    if (!urlData.publicUrl) throw new Error('Failed to get public URL');

    const { data: recordData, error: recordError } = await supabase
      .from('medicaldata')
      .insert([
        { 
          url: urlData.publicUrl
        }
      ]);

    if (recordError) throw recordError;

    return urlData.publicUrl;

  } catch (error) {
    console.error('Supabase error:', error);
    throw error;
  }
}