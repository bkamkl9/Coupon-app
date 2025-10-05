// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { google } from 'npm:googleapis';
const CLIENT_EMAIL = Deno.env.get("CLIENT_EMAIL");
const PRIVATE_KEY = Deno.env.get("PRIVATE_KEY").replace(/\\n/g, '\n');
const PROJECT_ID = Deno.env.get("PROJECT_ID");
const getAccessToken = async ()=>{
  console.log('Client email:', CLIENT_EMAIL);
  console.log('Private key starts with:', PRIVATE_KEY);
  // Use JWT constructor with service account credentials
  const jwtClient = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/firebase.messaging'
    ]
  });
  try {
    const tokens = await jwtClient.authorize();
    console.log('Successfully obtained access token');
    return tokens.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};
const sendPushToAllUsers = async (title: string, body: string)=>{
  const accessToken = await getAccessToken();
  const message = {
    message: {
      topic: 'all-users',
      notification: {
        title: title,
        body: body
      },
      android: {
        priority: 'high'
      },
      data: {
        // Optional: add custom data
        type: 'broadcast',
        timestamp: new Date().toISOString()
      }
    }
  };
  const response = await fetch(`https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
  const data = await response.json();
  console.log('FCM response:', data);
};

Deno.serve(async (req)=>{
  const url = new URL(req.url);
  const title = "Nowy kupon znizkowy"
  const body = "Sprawdz aplikacje — wlasnie dodalismy nowy kupon znizkowy. Skorzystaj, zanim wygasnie!"
  await sendPushToAllUsers(title, body);
  return new Response(JSON.stringify({
    "success": true
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  });
});
