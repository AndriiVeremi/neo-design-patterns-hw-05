import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReport } from './DirectoryReport';

export class DirectoryAnalyzer {
    analyze(dirPath: string): DirectoryReport {
        const report: DirectoryReport = {
            files: 0,
            directories: 0,
            totalSize: 0,
            extensions: {},
        };

        try {
            const entries = fs.readdirSync(dirPath);

            for (const entry of entries) {
                const entryPath = path.join(dirPath, entry);
                const stats = fs.statSync(entryPath);

                if (stats.isDirectory()) {
                    report.directories++;
                    const subReport = this.analyze(entryPath);
                    report.files += subReport.files;
                    report.directories += subReport.directories;
                    report.totalSize += subReport.totalSize;
                    for (const ext in subReport.extensions) {
                        report.extensions[ext] = (report.extensions[ext] || 0) + subReport.extensions[ext];
                    }
                } else if (stats.isFile()) {
                    report.files++;
                    report.totalSize += stats.size;
                    const ext = path.extname(entry).toLowerCase();
                    report.extensions[ext] = (report.extensions[ext] || 0) + 1;
                }
            }
        } catch (error) {
            console.error(`Error analyzing directory ${dirPath}:`, error);
        }

        return report;
    }
}