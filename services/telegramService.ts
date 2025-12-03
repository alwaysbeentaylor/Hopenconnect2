import { ContactFormData } from '../types';

// NOTE: In a real deployment, these should be environment variables.
// Since this is a generated demo, placeholders are used.
// The user should replace these with their actual Bot Token and Chat ID.
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

export const sendLeadToTelegram = async (data: ContactFormData): Promise<boolean> => {
  if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.warn('Telegram Bot Token not configured. Simulating success.');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return true;
  }

  const message = `
🌟 *Nieuwe Lead Vastgoed* 🌟

👤 *Naam:* ${data.name}
📧 *Email:* ${data.email}
📱 *Tel:* ${data.phone}
🏗️ *Type:* ${data.projectType}

📝 *Bericht:*
${data.message}
  `;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
};