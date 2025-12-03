import { ContactFormData } from '../types';

// NOTE: In a real deployment, these should be environment variables.
const TELEGRAM_BOT_TOKEN = '8547433349:AAFniIQU7rO9-nzHkgJK6F7Hv3MzLzv1Ymk';
const TELEGRAM_CHAT_ID = '1471110442';

export const sendLeadToTelegram = async (data: ContactFormData): Promise<boolean> => {
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

export const sendGuideRequestToTelegram = async (email: string): Promise<boolean> => {
  const message = `
📚 *Gratis Gids Aanvraag* 📚

📧 *Email:* ${email}

_Bezoeker wil de "7 Geheimen van Vastgoed Investeren" gids ontvangen._
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
    console.error('Error sending guide request to Telegram:', error);
    return false;
  }
};