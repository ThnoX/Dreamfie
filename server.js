const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe('***REMOVED***MOMAIcLwCWQR5sYNJIKbJu5wBX4ozgYZDDuurqo4Vg5wh4g7MVyfnJ33pbDM9nni400RLG3vN3A');

/** 📨 SMTP yapılandırması **/
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@dreamfie.com',
    pass: 'Hatunum.73m87xa8',
  },
});

/** ✅ Stripe ödeme intent oluştur **/
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'try',
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('❌ PaymentIntent oluşturulamadı:', err.message);
    res.status(500).send({ error: err.message });
  }
});

/** 📨 Sipariş e-postası gönder **/
app.post('/send-order-email', async (req, res) => {
  const { product, price, theme, note, deliveryType, customer } = req.body;

  console.log('📥 Sipariş alındı:', req.body);

  const mailOptions = {
    from: '"Dreamfie" <noreply@dreamfie.com>',
    to: 'siparis@dreamfie.com',
    subject: '📦 Yeni Sipariş Bildirimi',
    html: `
      <h2>🛍️ Yeni Sipariş</h2>
      <p><strong>Ürün:</strong> ${product}</p>
      <p><strong>Fiyat:</strong> ${price} ₺</p>
      <p><strong>Tema:</strong> ${theme}</p>
      <p><strong>Not:</strong> ${note || '-'}</p>

      <hr/>
      <h3>🚚 Teslimat Türü:</h3>
      <p>${deliveryType === 'fiziksel' ? 'Fiziksel Teslimat (kargo ile)' : 'Dijital Teslimat (e-posta ile)'}</p>

      <h3>👤 Müşteri Bilgileri:</h3>
      <ul style="line-height: 1.6; font-size: 15px;">
        <li><strong>Ad Soyad:</strong> ${customer?.name || '-'}</li>
        <li><strong>E-posta:</strong> ${customer?.email || '-'}</li>
        ${deliveryType === 'fiziksel' ? `
          <li><strong>Adres:</strong> ${customer?.address || '-'}</li>
          <li><strong>Şehir:</strong> ${customer?.city || '-'}</li>
          <li><strong>Posta Kodu:</strong> ${customer?.postalCode || '-'}</li>
        ` : ''}
      </ul>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ E-posta gönderildi:', result.accepted);
    res.status(200).json({ message: 'E-posta başarıyla gönderildi' });
  } catch (error) {
    console.error('❌ Mail gönderim hatası:', error.message);
    res.status(500).json({ error: 'Mail gönderilemedi', details: error.message });
  }
});

app.listen(4242, () => console.log('🚀 Backend çalışıyor: http://localhost:4242'));
