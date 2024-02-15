import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRoleService } from 'src/app-backoffice/admin-role/admin-role.service';
import { Admins } from 'src/entities/admins.entity';
import { PERMISSIONS } from 'src/shared/enums/permissions.enum';
import { Repository } from 'typeorm';

@Injectable()
export class AdminSeedService {
  constructor(
    @InjectRepository(Admins)
    private repository: Repository<Admins>,
    private adminRoleService: AdminRoleService,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const role = await this.adminRoleService.create({
        name: 'Super Admin',
        permissions: Object.values(PERMISSIONS),
      });
      await this.repository.save(
        this.repository.create({
          name: 'Super Admin',
          email: 'super@admin.com',
          password: 'ggwp',
          role,
        }),
      );
    }
  }
}
