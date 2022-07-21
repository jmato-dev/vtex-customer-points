import { MasterData } from "@vtex/api";

export async function pointsGetDB(client: MasterData, userId: string) {
    const [storedCustomer] = await client.searchDocuments<{points: number, userId: string}>({
        dataEntity: 'customer_points',
        fields: ['points', 'userId'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${userId}`
      });
  
    return storedCustomer;
}