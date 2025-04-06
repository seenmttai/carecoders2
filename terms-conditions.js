class TermsAndConditions {
  constructor() {
    this.createModal();
  }

  createModal() {

    if (!document.getElementById('terms-modal')) {
      const modal = document.createElement('div');
      modal.id = 'terms-modal';
      modal.className = 'terms-modal';
      modal.innerHTML = `
        <div class="terms-content">
          <div class="terms-header">
            <h3>Terms and Conditions</h3>
            <button class="close-terms">&times;</button>
          </div>
          <div class="terms-body">
            <h4>Medical Data Terms of Use</h4>
            <p>By using Diagno+ diagnostic services, you acknowledge and agree to the following terms:</p>

            <h5>1. Consent for Data Storage</h5>
            <p>You grant Diagno+ permission to store your medical data, including diagnostic images, 
            analysis results, and the personal information you provide. Your data will be stored securely 
            in encrypted form in our cloud-based system.</p>

            <h5>2. Data Usage</h5>
            <p>Your anonymized data may be used to improve our diagnostic algorithms and for research 
            purposes. No personally identifiable information will be shared with third parties without your explicit consent, 
            except as required by law.</p>

            <h5>3. Security Measures</h5>
            <p>We implement industry-standard security protocols to protect your data. However, no system 
            is completely immune to security breaches. We will notify you promptly in the event of any data breach 
            that may affect your personal information.</p>

            <h5>4. Data Retention</h5>
            <p>Your medical data will be retained for a period of 7 years or as required by applicable healthcare 
            regulations, whichever is longer. You may request deletion of your data at any time, subject to legal 
            and regulatory requirements.</p>

            <h5>5. Medical Disclaimer</h5>
            <p>Diagno+ provides diagnostic assistance tools powered by artificial intelligence. These tools are not a 
            substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your 
            physician or other qualified health provider with any questions you may have regarding a medical condition.</p>

            <h5>6. Limitation of Liability</h5>
            <p>Diagno+ and its affiliates shall not be liable for any damages arising from the use of our services, 
            including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>

            <h5>7. HIPAA Compliance</h5>
            <p>Our data practices comply with the Health Insurance Portability and Accountability Act (HIPAA). 
            We maintain appropriate physical, technical, and administrative safeguards to protect your health information.</p>

            <h5>8. Changes to Terms</h5>
            <p>We may update these terms from time to time. You will be notified of any significant changes 
            and may be required to provide new consent.</p>
          </div>
          <div class="terms-footer">
            <button id="accept-terms" class="accept-terms-btn">Accept Terms</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.querySelector('.close-terms').addEventListener('click', () => {
        this.hideModal();
      });

      document.getElementById('accept-terms').addEventListener('click', () => {
        this.hideModal();
        const checkbox = document.querySelector('.terms-checkbox input');
        if (checkbox) checkbox.checked = true;
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.hideModal();
      });

      const style = document.createElement('style');
      style.textContent = `
        .terms-modal {
          display: none;
          position: fixed;
          z-index: 2000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.6);
          overflow: auto;
        }

        .terms-content {
          background-color: var(--bg-color);
          margin: 5% auto;
          padding: 0;
          width: 80%;
          max-width: 700px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          animation: modalFadeIn 0.3s;
        }

        @keyframes modalFadeIn {
          from {opacity: 0; transform: translateY(-20px);}
          to {opacity: 1; transform: translateY(0);}
        }

        .terms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 12px 12px 0 0;
        }

        .terms-header h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        .close-terms {
          font-size: 28px;
          font-weight: bold;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .terms-body {
          padding: 20px;
          max-height: 50vh;
          overflow-y: auto;
          color: var(--text-color);
        }

        .terms-body h4 {
          margin-top: 0;
        }

        .terms-body h5 {
          margin-top: 15px;
          margin-bottom: 5px;
          color: var(--primary-color);
        }

        .terms-footer {
          padding: 15px 20px;
          text-align: right;
          border-top: 1px solid var(--border-color);
        }

        .accept-terms-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        }

        .accept-terms-btn:hover {
          background-color: var(--primary-light);
        }

        .terms-checkbox {
          display: flex;
          align-items: center;
          margin: 15px 0;
        }

        .terms-checkbox input {
          margin-right: 10px;
        }

        .terms-link {
          color: var(--primary-color);
          cursor: pointer;
          text-decoration: underline;
        }
      `;
      document.head.appendChild(style);
    }
  }

  showModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.style.display = 'block';
  }

  hideModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.style.display = 'none';
  }
}

const termsAndConditions = new TermsAndConditions();