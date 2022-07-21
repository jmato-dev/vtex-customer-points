import { MasterData } from "@vtex/api";

export async function pointsPatchDB(client: MasterData, userId: string, points:string) {
    const [storedCustomer] = await client.searchDocuments<{id: string}>({
        dataEntity: 'customer_points',
        fields: ['id'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${userId}`
    });

    if (!storedCustomer)
        console.log('erro');


    await client.createOrUpdatePartialDocument({
        dataEntity: 'customer_points',
        fields: {
            points: parseInt(points)
        },
        id: storedCustomer.id,
        schema: 'v1',
    });    
}