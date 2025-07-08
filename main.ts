import { ReportManager } from './ReportManager';

const targetPath = process.argv[2] || '.';
const format = process.argv[3] || 'json';

const manager = new ReportManager(format);
manager.generateReport(targetPath);