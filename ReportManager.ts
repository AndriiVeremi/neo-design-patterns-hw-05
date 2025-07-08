import { ReportAdapter } from './ReportAdapter';
import { JsonReportAdapter } from './JsonReportAdapter';
import { CsvReportAdapter } from './CsvReportAdapter';
import { XmlReportAdapter } from './XmlReportAdapter';
import { AnalyzerFacade } from './AnalyzerFacade';
import * as fs from 'fs';
import * as path from 'path';

export class ReportManager {
    private analyzerFacade: AnalyzerFacade;

    constructor(format: string) {
        let adapter: ReportAdapter;
        switch (format.toLowerCase()) {
            case 'json':
                adapter = new JsonReportAdapter();
                break;
            case 'csv':
                adapter = new CsvReportAdapter();
                break;
            case 'xml':
                adapter = new XmlReportAdapter();
                break;
            default:
                throw new Error(`Unsupported report format: ${format}`);
        }
        this.analyzerFacade = new AnalyzerFacade(adapter);
    }

    generateReport(targetPath: string): void {
        try {
            const reportContent = this.analyzerFacade.generateReport(targetPath);

            const reportsDir = path.join(process.cwd(), 'reports');
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir);
            }

            const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
            const format = this.analyzerFacade['adapter'].constructor.name.replace('ReportAdapter', '').toLowerCase();
            const fileName = `report-${timestamp}.${format}`;
            const filePath = path.join(reportsDir, fileName);

            fs.writeFileSync(filePath, reportContent);

            console.log(`Report generated successfully: ${filePath}`);
        } catch (error) {
            console.error(`Error generating report:`, error);
        }
    }
}