// app/api/recommend-diet/route.js

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch('http://35.174.171.89:8080/recommend-diet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
