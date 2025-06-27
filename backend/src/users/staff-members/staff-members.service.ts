import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StaffRole } from '@prisma/client';
import * as argon from 'argon2';
import { Pagination } from 'src/common/interfaces';
import { DatabaseService } from 'src/database/database.service';
import { CreateStaffMemberDto, UpdateStaffMemberDto } from './dto';

@Injectable()
export class StaffMembersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createStaffMemberDto: CreateStaffMemberDto, authorId?: number) {
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

    const res = await this.db.staffMember.create({
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

    if (authorId) {
      await this.db.staffActivityLog.create({
        data: {
          staffMemberId: authorId,
          activity: `Created staff member with id: ${res.id}, username:${res.username} and role: ${res.role}`,
        },
      });
    }

    return res;
  }

  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for demonstration purposes
    return this.db.staffMember.findMany({});
  }

  async findOne(id: number) {
    const user = await this.db.staffMember.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Staff Member not found');
    }
    return user;
  }

  async update(
    id: number,
    updateStaffMemberDto: UpdateStaffMemberDto,
    authorId?: number,
  ) {
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

    if (updateStaffMemberDto.role !== StaffRole.Admin) {
      // gonna change role of admin
      // restrict if there is only one admin and that admin is going to get updated by this request
      const adminCount = await this.db.staffMember.count({
        where: { role: StaffRole.Admin, id: { not: id } },
      });
      if (adminCount === 0) {
        throw new ConflictException(
          'At least one staff member must have the Admin role',
        );
      }
    }

    let passwordHash: string | undefined = undefined;
    if (updateStaffMemberDto.password) {
      passwordHash = await argon.hash(updateStaffMemberDto.password);
    }

    const res = await this.db.staffMember.update({
      where: { id },
      data: {
        name: updateStaffMemberDto.name,
        username: updateStaffMemberDto.username,
        role: updateStaffMemberDto.role,
        passwordHash: passwordHash, // Only update password if provided
      },
    });

    if (authorId) {
      await this.db.staffActivityLog.create({
        data: {
          staffMemberId: authorId,
          activity: `Updated staff member with id: ${id}, username:${res.username} and role: ${res.role}`,
        },
      });
    }

    return res;
  }

  async remove(id: number, authorId?: number) {
    const adminAccounts = await this.db.staffMember.findMany({
      where: { role: StaffRole.Admin },
    });
    if (adminAccounts.length === 1 && adminAccounts[0].id === id) {
      throw new ConflictException(
        'Cannot delete the last admin account. At least one admin account must exist.',
      );
    }

    const res = await this.db.staffMember.delete({
      where: { id },
    });

    if (authorId) {
      await this.db.staffActivityLog.create({
        data: {
          staffMemberId: authorId,
          activity: `Deleted staff member with id: ${id}, username:${res.username} and role: ${res.role}`,
        },
      });
    }

    return res;
  }

  async getActivityLogs(userId: number, pagination: Pagination) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for demonstration purposes
    const { page, pageSize } = pagination;
    const totalCount = await this.db.staffActivityLog.count({
      where: { staffMemberId: userId },
    });
    const logs = await this.db.staffActivityLog.findMany({
      where: { staffMemberId: userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    return {
      logs,
      totalCount,
    };
  }

  clearActivityLogs(userId: number, authorId?: number) {
    return this.db.staffActivityLog.deleteMany({
      where: {
        staffMemberId: userId,
      },
    });
  }
}
