export function generateCbu() {
  let cbu = '';
  for (let i = 0; i < 22; i++) {
    cbu += Math.floor(Math.random() * 10);
  }
  return cbu;
}
