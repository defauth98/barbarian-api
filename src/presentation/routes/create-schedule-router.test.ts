import { describe, expect, it } from 'vitest'
import { HttpRequest } from '../protocols/http-request'
import * as z from 'zod';
import { CreateScheduleSchema } from '../schemas/create-schedule.schema';
import { HttpResponse } from '../protocols/http-response';
import { Router } from '../protocols/router';

class CreateScheduleRouter implements Router {
  route(httpRequest: HttpRequest): HttpResponse {
    try {
      CreateScheduleSchema.parse(httpRequest.body)

      return {
        status: 200,
        body: {}
      }

    } catch (e) {
      return {
        status: 400,
        body: e
      }
    }
  }
}

describe('Create Schedule Router', () => {
  it('should return 400 when invalid body are provided', () => {
    const sut = new CreateScheduleRouter()
    const request: HttpRequest = {
      body: {}
    }

    const response = sut.route(request)

    expect(response.status).toBe(400)
  })

  it('should returnzod validation when invalid body are provided', () => {
    const sut = new CreateScheduleRouter()

    const body = {
      from: 'any_value',
      to: 'any_value',
      day: 'any_value',
      mounth: 'any_value',
      service_id: 'any_value',
      userId: 'any_value',
      year: 'any_value'
    }
    const request: HttpRequest = {
      body
    }

    const response = sut.route(request)

    expect(response.status).toBe(400)
    expect(request.body).toBeTruthy()
  })

  it('should return 200 when valid body are provided', () => {
    const sut = new CreateScheduleRouter()

    const body: z.infer<typeof CreateScheduleSchema> = {
      from: 'any_string',
      to: 'any_string',
      day: 1,
      mounth: 1,
      service_id: 1,
      userId: 1,
      year: 1
    }
    const request: HttpRequest = {
      body
    }

    const response = sut.route(request)

    expect(response.status).toBe(200)
  })
})