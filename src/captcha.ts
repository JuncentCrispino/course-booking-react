export async function executeRecaptcha(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY, {
          action: 'submit',
        })
        .then((token: string) => {
          resolve(token);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  });
}
