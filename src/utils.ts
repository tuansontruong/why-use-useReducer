export async function login({ username, password }: { username: string, password: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'sean' && password === 'sean') {
        resolve(true);
      } else {
        reject();
      }
    }, 1000);
  });
}
