import net from 'net';

const host = 'db.rotaract3192.org';
const ports = [54321, 54322, 54323, 54324, 54325];

async function checkPort(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    
    socket.on('connect', () => {
      socket.destroy();
      resolve({ port, status: 'OPEN' });
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ port, status: 'TIMEOUT' });
    });
    
    socket.on('error', (err) => {
      socket.destroy();
      resolve({ port, status: `CLOSED (${err.code})` });
    });
    
    socket.connect(port, host);
  });
}

async function run() {
  console.log(`Scanning ports on ${host}...`);
  for (const port of ports) {
    const result = await checkPort(port);
    console.log(`  Port ${result.port}: ${result.status}`);
  }
}

run();
