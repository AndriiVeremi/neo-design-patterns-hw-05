import { ReportAdapter } from './ReportAdapter';
import { DirectoryReport } from './DirectoryReport';

export class CsvReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
        let csv = 'Metric,Value\n';
        csv += `Total Files,${report.files}\n`;
        csv += `Total Directories,${report.directories}\n`;
        csv += `Total Size (bytes),${report.totalSize}\n\n`;

        csv += 'Extension,Count\n';
        for (const ext in report.extensions) {
            csv += `${ext},${report.extensions[ext]}\n`;
        }

        return csv;
    }
}