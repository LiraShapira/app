export function sendForm(_form: DepositForm): Promise<string> {
  console.log('sending')
  return new Promise(resolve =>
    setTimeout(() => resolve(''), 1000),
  );
}
