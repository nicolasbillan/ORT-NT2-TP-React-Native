export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "El email no puede estar en blanco."
  if (!re.test(email)) return 'Ooops! Necesitamos una dirección de email válida.'
  return ''
}
