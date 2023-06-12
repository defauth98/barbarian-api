import * as z from 'zod'

export const CreateScheduleSchema = z.object({
  from: z.string(),
  to: z.string(),
  day: z.number(),
  mounth: z.number(),
  year: z.number(),
  userId: z.number(),
  service_id: z.number()
})