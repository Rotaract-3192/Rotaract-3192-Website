import net from 'net';
import tls from 'tls';

const host = 'db.rotaract3192.org';
const port = 5432;

function testPgSsl() {
  return new Promise((resolve) => {
    console.log(`Connecting to ${host}:${port}...`);
    const socket = new net.Socket();

    socket.connect(port, host, () => {
      console.log('Connected to socket. Sending PostgreSQL SSLRequest (8 bytes)...');
      // SSLRequest packet: length (8), code (80877103)
      const sslRequest = Buffer.from('0000000804d2162f', 'hex');
      socket.write(sslRequest);
    });

    socket.once('data', (data) => {
      const responseByte = data.toString('utf-8');
      console.log(`Received response byte: "${responseByte}" (Hex: ${data.toString('hex')})`);

      if (responseByte === 'S') {
        console.log('Server agreed to SSL (S). Upgrading socket to TLS...');
        
        // Upgrade the socket to TLS
        const tlsSocket = tls.connect({
          socket: socket,
          rejectUnauthorized: false,
          servername: host
        }, () => {
          console.log('✅ TLS handshake succeeded!');
          console.log('Cipher:', tlsSocket.getCipher().name);
          tlsSocket.end();
          resolve(true);
        });

        tlsSocket.on('error', (err) => {
          console.log('❌ TLS socket error:', err.message || err);
          resolve(false);
        });
      } else if (responseByte === 'N') {
        console.log('❌ Server rejected SSL (N). SSL is not supported.');
        socket.destroy();
        resolve(false);
      } else {
        console.log('❌ Unexpected response (not S or N). The port might not be PostgreSQL.');
        socket.destroy();
        resolve(false);
      }
    });

    socket.on('error', (err) => {
      console.log('❌ Socket error:', err.message);
      resolve(false);
    });
  });
}

testPgSsl();
