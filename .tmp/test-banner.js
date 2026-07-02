import net from 'net';

const host = 'db.rotaract3192.org';

function testBanner(port) {
  return new Promise((resolve) => {
    console.log(`Connecting to plain TCP socket ${host}:${port}...`);
    const socket = new net.Socket();
    
    socket.on('data', (data) => {
      console.log(`[Port ${port}] Data received:`, data.toString('utf-8'));
      console.log(`[Port ${port}] Hex:`, data.toString('hex'));
      socket.destroy();
      resolve(true);
    });
    
    socket.on('error', (err) => {
      console.log(`[Port ${port}] Error:`, err.message);
      resolve(false);
    });
    
    socket.on('close', () => {
      console.log(`[Port ${port}] Socket closed`);
      resolve(false);
    });
    
    socket.connect(port, host, () => {
      console.log(`[Port ${port}] Connected. Sending test string...`);
      socket.write("GET / HTTP/1.1\r\nHost: db.rotaract3192.org\r\n\r\n");
    });
    
    setTimeout(() => {
      console.log(`[Port ${port}] Timeout`);
      socket.destroy();
      resolve(false);
    }, 4000);
  });
}

async function run() {
  await testBanner(5432);
  console.log("---");
  // Test supabase.aaroha.life
  console.log("Testing supabase.aaroha.life...");
  const host2 = 'supabase.aaroha.life';
  const testBanner2 = (port) => {
    return new Promise((resolve) => {
      console.log(`Connecting to plain TCP socket ${host2}:${port}...`);
      const socket = new net.Socket();
      
      socket.on('data', (data) => {
        console.log(`[${host2}:${port}] Data received:`, data.toString('utf-8'));
        socket.destroy();
        resolve(true);
      });
      
      socket.on('error', (err) => {
        console.log(`[${host2}:${port}] Error:`, err.message);
        resolve(false);
      });
      
      socket.connect(port, host2, () => {
        console.log(`[${host2}:${port}] Connected. Sending PG startup...`);
        // Send a standard PG startup packet
        const buf = Buffer.from('0000000804d2162f', 'hex');
        socket.write(buf);
      });
      
      setTimeout(() => {
        console.log(`[${host2}:${port}] Timeout`);
        socket.destroy();
        resolve(false);
      }, 4000);
    });
  };
  await testBanner2(5432);
}

run();
