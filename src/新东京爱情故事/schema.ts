export const Schema = z.object({
  系统: z.object({
    当前日期: z.string(),
    当前时间: z.string(),
    当前地点: z.string(),
    天气: z.string(),
  }),
  绘梨衣: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)),
    穿着: z.object({
      上衣: z.string(),
      下装: z.string(),
      鞋子: z.string(),
      配饰: z.string(),
      内衣: z.string(),
    }),
    持有物品: z.record(z.string().describe('物品名'), z.string()),
  }),
  路明非: z.object({
    穿着: z.object({
      上衣: z.string(),
      下装: z.string(),
      鞋子: z.string(),
    }),
    持有物品: z.record(z.string().describe('物品名'), z.string()),
  }),
});

export type Schema = z.output<typeof Schema>;
