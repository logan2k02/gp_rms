import { ConflictException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { CreateStaffMemberDto, UpdateStaffMemberDto } from './dto';

@Injectable()
export class StaffMembersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createStaffMemberDto: CreateStaffMemberDto) {
    const alreadyExists = await this.db.staffMember.findFirst({
      where: {
        username: createStaffMemberDto.username,
      },
    });

    if (alreadyExists) {
      throw new ConflictException(
        'Staff Member with this username already exists',
      );
    }

    const passwordHash = await argon.hash(createStaffMemberDto.password);

    return this.db.staffMember.create({
      data: {
        name: createStaffMemberDto.name,
        username: createStaffMemberDto.username,
        role: createStaffMemberDto.role,
        passwordHash,
      },
      omit: {
        passwordHash: true,
      },
    });
  }

  findAll() {
    return this.db.staffMember.findMany({});
  }

  findOne(id: number) {
    return this.db.staffMember.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateStaffMemberDto: UpdateStaffMemberDto) {
    const alreadyExists = await this.db.staffMember.findFirst({
      where: {
        username: updateStaffMemberDto.username as string,
        id: { not: id },
      },
    });

    if (alreadyExists) {
      throw new ConflictException(
        'Staff Member with this username already exists',
      );
    }

    return this.db.staffMember.update({
      where: { id },
      data: updateStaffMemberDto,
    });
  }

  remove(id: number) {
    return this.db.staffMember.delete({
      where: { id },
    });
  }
}
