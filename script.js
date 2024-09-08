import { noty } from './utils/notyMsg.js';

const environment = 'production';

const config = {
  development: 'http://localhost:3000/upload',
  production: 'https://https://gemini-summarize-pdfs.onrender.com/upload'
};

const defaultAPIUrl = config[environment];

const loadingEl = document.querySelector('.loader');
const contentBox = document.querySelector('.content');

export const handleSubmitForm = async (e) => {
  e.preventDefault();

  loadingEl.classList.add('on');

  try {
    const formData = new FormData(e.target);

    const promptValue = formData.get('textInput');
    const pdfFiles = formData.getAll('pdfsInput'); 
     
    if (promptValue.length < 3) {
      noty('Prompt tem que ter no minímo 3 caracteres', 'warning');
      return;
    }
    
    formData.append('prompt', promptValue);
    pdfFiles.forEach((pdf, i) => formData.append(i, pdf));

    const response = await fetch(defaultAPIUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const bodyJson = await response.json();

    loadingEl.classList.remove('on');

    if (response.status === 400) {
      noty(bodyJson.description, 'warning');
      return;
    }

    contentBox.innerText = bodyJson.content;
    e.target.reset();
  } catch (error) {
    noty('Ocorreu um erro desconhecido', 'error');
    loadingEl.classList.remove('on');
  }
};


window.handleSubmitForm = handleSubmitForm;
