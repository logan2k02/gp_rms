import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const alreadyExists = await this.db.customer.findFirst({
      where: { phone: createCustomerDto.phone },
    });

    if (alreadyExists) {
      throw new ConflictException(
        'Customer with this phone number already exists',
      );
    }

    return this.db.customer.create({
      data: createCustomerDto,
    });
  }

  findAll() {
    return this.db.customer.findMany({});
  }

  findOne(id: number) {
    return this.db.customer.findUnique({
      where: { id },
    });
  }

  findByPhone(phone: string) {
    return this.db.customer.findFirst({
      where: { phone },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const alreadyExists = await this.db.customer.findFirst({
      where: { phone: updateCustomerDto.phone as string, id: { not: id } },
    });

    if (alreadyExists) {
      throw new ConflictException(
        'Customer with this phone number already exists',
      );
    }

    return this.db.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    return this.db.customer.delete({
      where: { id },
    });
  }
}
