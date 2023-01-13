export default function fetchData({
  url,
  method = "GET",
  host = process.env.REACT_APP_API_HOST,
  body,
}) {
  return fetch(`${host}${url}`, {
    method,
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body,
  }).then(async (response) => {
    // ambil result dari response API
    const jsonResponse =
      response.status < 250 ? await response.json() : response;
    // cek jika statusnya ok make return datanya
    if (response.ok) return jsonResponse;
    // jika tidak ok maka return error
    throw new Error(JSON.stringify(jsonResponse));
  });
}
