export function validateCPF(cpf: string): boolean {
  if (!cpf || typeof cpf !== 'string') return false;
  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let check1 = 11 - (sum % 11);
  if (check1 > 9) check1 = 0;
  if (check1 !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let check2 = 11 - (sum % 11);
  if (check2 > 9) check2 = 0;
  return check2 === parseInt(cpf[10]);
}
