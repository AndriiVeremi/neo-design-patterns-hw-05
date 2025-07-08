import { ReportAdapter } from './ReportAdapter';
import { DirectoryReport } from './DirectoryReport';

export class XmlReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<report>\n';
        xml += `  <files>${report.files}</files>\n`;
        xml += `  <directories>${report.directories}</directories>\n`;
        xml += `  <totalSize>${report.totalSize}</totalSize>\n`;
        xml += '  <extensions>\n';
        for (const ext in report.extensions) {
            xml += `    <extension name="${ext}" count="${report.extensions[ext]}"/>\n`;
        }
        xml += '  </extensions>\n';
        xml += '</report>';
        return xml;
    }
}