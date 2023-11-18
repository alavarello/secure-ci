export async function sendNotification(domainName, chainId, address, title, body) {
  const response = await fetch(
    'https://notify.walletconnect.com/dc226665666de6862c10b8f9c5caf7af/notify',
    {
      method: "POST",
      headers: {
        Authorization: 'Bearer 0eb2953b-6c71-456a-a8eb-c31afc85e6db',
      },
      body: JSON.stringify({
        notification: {
          type: "6b6979ab-e6fa-42bb-b954-9f2822ca682b", // Notification type ID copied from Cloud 
          title,
          body,
          icon: "https://secureci.xyz/secureci.png",
          url: `https://${domainName}`,
        },
        accounts: [
          `eip155:${chainId}:${address}`, // CAIP-10 account ID
        ]
      })
    }
  );
  return response.status === 200 || response.status === 201;
}
