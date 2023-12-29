export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const entry = await captchaStorage.getItem(body.uuid)
  if (!entry || entry !== body.captcha)
    return {
      error: true,
      errors: ['Invalid captcha.']
    }

  return {
    success: true,
    message: 'Captcha is valid.'
  }

})