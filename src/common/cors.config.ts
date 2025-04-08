import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://example.com',
      'http://localhost:3001',

      'https://basil-pos-xi.vercel.app', //dashboard
      'https://basil-pos-local.vercel.app',

      'https://basil-lms.vercel.app', //lms user
      'https://basil-lms-local.vercel.app',

      'https://basil-staff-audit.vercel.app', //staff evaluation
      'https://basil-staff-audit-dev.vercel.app',

      'https://basil-audit.vercel.app', //auditor site
      'https://basil-audit-dev.vercel.app',

      'https://basil-feedback.vercel.app', //feedback
      'https://basil-feedback-dev.vercel.app',
    ];

    console.log('origin received: ', origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
