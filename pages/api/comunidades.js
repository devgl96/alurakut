import {SiteClient} from "datocms-client";

export default async function recebedorDeRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = "acdbdf42a1e7b70a17229d4659e789";
        const client = new SiteClient(TOKEN);
    
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "968769", // ID do Model de "Communities" criado pelo DatoCMS
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/omariosouto.png",
            // creatorSlug: "omariosouto"
        });
    
        response.json({
            dados: "Algum dado qualquer", 
            registroCriado: registroCriado
        });

        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    });

}