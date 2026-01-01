// using native fetch

const email = 'test_admin_' + Date.now() + '@gmail.com'; // Use unique email to avoid "User already exists"
const password = 'password123';

async function testRegistrationFlow() {
    try {
        console.log(`1. Requesting OTP for ${email}...`);
        const otpRes = await fetch('http://localhost:5000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const otpData = await otpRes.json();
        console.log('OTP Response:', otpData);

        if (!otpRes.ok) {
            console.error('Failed to send OTP');
            return;
        }

        const otp = otpData.otp;
        console.log(`2. Received OTP: ${otp}`);

        console.log('3. Registering with OTP...');
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, otp })
        });

        const regData = await regRes.json();
        console.log('Registration Status:', regRes.status);
        console.log('Registration Response:', JSON.stringify(regData, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

testRegistrationFlow();
