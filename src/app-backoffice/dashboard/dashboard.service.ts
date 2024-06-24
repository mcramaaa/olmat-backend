import { Injectable } from '@nestjs/common';
import { ParticipantStatus } from 'src/shared/enums/participants.enum';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private datasource: DataSource) {}
  async getDashboardData() {
    const dashboardQuery = `SELECT (SELECT SUM(amount) FROM payments WHERE status = 'paid') AS total_pendapatan,
                  (SELECT COUNT(*) FROM schools WHERE is_accept = true) AS total_sekolah,
                  (SELECT COUNT(*) FROM participants WHERE status = '${ParticipantStatus.ACTIVE}') AS total_peserta,
                  (SELECT COUNT(*) FROM participants WHERE status = '${ParticipantStatus.CANCEL}') AS total_peserta_cancel,
                  (SELECT COUNT(*) FROM regions) AS total_region
                  ;`;
    return this.datasource.query(dashboardQuery);
  }
}
