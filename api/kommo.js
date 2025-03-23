export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { username, password } = req.body;
    const token = process.env.KOMMO_API_TOKEN;eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAxNDIwMGRlMDlkY2NhMDMxODUwYzM0ZmNlMDQ1N2UwM2YyM2Y1NDUxNmIyMWIwNDNkZGYzNWE0ZmNiNmJiYTBmNzM1M2I0YjQ1YThkNTBiIn0.eyJhdWQiOiIzOTQwYzU2Mi1jMTdlLTRjODItODIxOS1mN2U0NDY1ODIzMzEiLCJqdGkiOiIwMTQyMDBkZTA5ZGNjYTAzMTg1MGMzNGZjZTA0NTdlMDNmMjNmNTQ1MTZiMjFiMDQzZGRmMzVhNGZjYjZiYmEwZjczNTNiNGI0NWE4ZDUwYiIsImlhdCI6MTc0Mjc1NDYxNywibmJmIjoxNzQyNzU0NjE3LCJleHAiOjE3NDU5NzEyMDAsInN1YiI6IjEyOTE0Mjg3IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM0MzQ1MjMxLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZGNhMDNlZTctMzMzOS00NTdjLWExNTItMjhlZGQ4Nzg1NTMwIiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.rhQE9wC7lrWEOiXqf-SOjZaryE6KRZYKK6uQycYPueJED9cAR4-i7GHnIr24ZEqr0fPA6hkcMAw_JGsN0Wsw8XYvliaV1BJ0QeVIH7ZMSe4l_2maRGjwdcdC28Z3D_DWMtlibMwJdle3n3NGcFT2cecDRbcuhuz8i0MKXInSQZ7KvpShzgBVF3IX9QYVV2hC8pGSTbAMyb9_2KqEbJ1nsU5XHWh7whsUFA8Q4Irlfq7pzDlyK-1a1RnC5kP-NiGcavMHzGR41R5olfM4uLMN5wCTaFuBBoIXmhjzNrrB-pODaz2VwyP8OuuSRQvYPVv5cGI6IUuftnU3iqWYgb-2rA
    const domain = process.env.KOMMO_DOMAIN;sinocaydiseno.kommo.com

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        // Buscar contacto
        let searchRes = await fetch(`https://${domain}/api/v4/contacts?query=${username}`, {
            headers
        });

        let searchData = await searchRes.json();
        let contactId = null;

        if (searchData._embedded && searchData._embedded.contacts.length > 0) {
            contactId = searchData._embedded.contacts[0].id;
        } else {
            const createRes = await fetch(`https://${domain}/api/v4/contacts`, {
                method: 'POST',
                headers,
                body: JSON.stringify([
                    {
                        name: username,
                        custom_fields_values: [
                            {
                                field_code: "POSITION",
                                values: [{ value: password }]
                            }
                        ]
                    }
                ])
            });
            const createdData = await createRes.json();
            contactId = createdData._embedded.contacts[0].id;
        }

        // Crear lead vinculado
        const leadRes = await fetch(`https://${domain}/api/v4/leads`, {
            method: 'POST',
            headers,
            body: JSON.stringify([
                {
                    name: `Chat Web - ${username}`,
                    _embedded: {
                        contacts: [{ id: contactId }]
                    }
                }
            ])
        });

        const leadData = await leadRes.json();
        const leadId = leadData._embedded.leads[0].id;

        return res.status(200).json({
            success: true,
            message: 'Contacto y lead creados en Kommo',
            contactId,
            leadId
        });

    } catch (err) {
        console.error('Error al conectar con Kommo:', err);
        return res.status(500).json({ success: false, error: 'Error al conectar con Kommo' });
    }
}
