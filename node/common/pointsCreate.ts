import { MasterData } from "@vtex/api";

export async function pointsCreateDB(client: MasterData, userId: string, points:number) {
    let [storedCustomer] = await client.searchDocuments<{id: string, points: number, userId: string}>({
        dataEntity: 'customer_points',
        fields: ['id', 'points', 'userId'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${userId}`
    });
    
    if (storedCustomer){
        console.log('erro');
    }
    
    await client.createDocument({
        dataEntity: 'customer_points',
        fields: {
            userId: userId,
            points: points
        },
        schema: 'v1',
    });
    
    [storedCustomer] = await client.searchDocuments<{id: string, points: number, userId: string}>({
        dataEntity: 'customer_points',
        fields: ['id', 'points', 'userId'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${userId}`
    });

    return storedCustomer;
}