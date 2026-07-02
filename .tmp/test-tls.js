import tls from 'tls';

const host = 'db.rotaract3192.org';

function testTls(port) {
  return new Promise((resolve) => {
    console.log(`Connecting to ${host}:${port} via direct TLS...`);
    const socket = tls.connect({
      host,
      port,
      rejectUnauthorized: false,
      servername: host
    }, () => {
      console.log(`✅ Direct TLS handshake SUCCEEDED on port ${port}!`);
      console.log(`Cipher: ${socket.getCipher().name}`);
      console.log(`Protocol: ${socket.getProtocol()}`);
      socket.end();
      resolve(true);
    });

    socket.on('error', (err) => {
      console.log(`❌ Direct TLS failed on port ${port}:`, err.message);
      resolve(false);
    });

    socket.setTimeout(3000, () => {
      console.log(`❌ Direct TLS timeout on port ${port}`);
      socket.destroy();
      resolve(false);
    });
  });
}

async function run() {
  await testTls(5432);
  await testTls(6543);
}

run();
