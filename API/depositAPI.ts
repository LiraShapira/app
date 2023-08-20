export function sendForm(_form: DepositForm): Promise<string> {
  return new Promise(resolve =>
    setTimeout(() => resolve(''), 1000),
  );
}
