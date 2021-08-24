module.exports.Options = {
  origin: [
    'http://localhost:3000',
    'http://peliculas.nomoredomains.club/',
    'https://peliculas.nomoredomains.club/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
