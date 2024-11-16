async function registerBiometric() {
  const id = new Uint8Array(16);
  try {
    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: 'Expense Analyser' },
      user: { id, name: 'Offline User', displayName: 'offline' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
      },
      timeout: 60000,
    };

    const credential = await navigator.credentials.create({ publicKey });

    console.log('Biometric registration successful!', credential);
  } catch (err) {
    console.error('Biometric registration failed:', err);
  }
  return id;
}

async function verifyBiometric(id: Uint8Array) {
  try {
    const publicKey: PublicKeyCredentialRequestOptions = {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      allowCredentials: [{ id, type: 'public-key' }],
      userVerification: 'required',
    };

    const assertion = await navigator.credentials.get({ publicKey });
    return assertion;
  } catch (err) {
    console.error('Biometric verification failed:', err);
    return null;
  }
}

export { registerBiometric, verifyBiometric };
