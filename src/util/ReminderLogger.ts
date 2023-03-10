import { table, TableUserConfig } from 'table';
import Reminder from '../Reminder';
import RemindersHandler, { RemindersGroupingByTag } from '../RemindersHandler';

const data = [
    ['1', 'Show all reminders š'],
    ['2', 'Search reminders š'],
    ['3', 'Add reminder ā'],
    ['4', 'Modify reminders š'],
    ['5', 'Toggle completion ā'],
    ['6', 'Exit š'],
];

const config: TableUserConfig = {
    header: {
        alignment: 'center',
        content: 'Reminders Menu',
    },
};

export default class ReminderLogger {
    static readonly MENU = table(data, config);

    /**
     * @description
     * Prints a reminders menu to the console.
     * Leading spaces on each line is first removed
     */
    public static logMenu(): void {
        console.log(this.MENU);
    }

    /**
     * Prints reminder tag uppercased to console proceeded by š·ļø
     *
     * @param reminder - reminder instance for task
     */
    public static logTag(reminder: Reminder): void {
        console.log(`š·ļø  ${reminder.tag.toUpperCase()}`);
    }

    /**
     * Prints tag to console proceeded by š·ļø
     *
     * @param tag - category of reminder
     */
    public static logTagString(tag: string): void {
        console.log(`\nš·ļø  ${tag.toUpperCase()}`);
    }

    /**
     * Prints reminder description to console
     * preceded  by š¢ if reminder status is complete;
     * otherwise, proceeded by ā­ļø.
     */
    public static logDescription(reminder: Reminder): void {
        if (reminder.isCompleted) {
            console.log(`  š¢ ${reminder.description}`);
        } else {
            console.log(`  ā­ļø ${reminder.description}`);
        }
    }

    /**
     * Prints reminder descriptions to console, grouped by tag
     *
     * @param remindersGroupings - grouping of reminders by tag
     */
    public static logGroupedReminders(remindersGroupings: RemindersGroupingByTag): void {
        Object.keys(remindersGroupings).forEach((tag) => {
            this.logTagString(`${tag}\n`);
            remindersGroupings[tag].forEach((reminder: Reminder) => {
                this.logDescription(reminder);
            });
        });
    }

    /**
     * Prints descriptions to console for each reminder
     *
     * @param reminders - list of reminders added
     */
    public static logReminders(reminders: Reminder[]): void {
        console.log('\n');
        reminders.forEach((reminder, index) => {
            console.log(` [${index + 1}] ${reminder.description}`);
        });
    }

    /**
     * Prints descriptions to console for each reminder
     *
     * @param reminders - list of reminders added
     */
    public static logSearchResults(reminders: Reminder[]): void {
        if (reminders.length === 0) this.log('No results found for search.\n');
        else {
            console.log('');
            reminders.forEach((reminder) => {
                this.logDescription(reminder);
            });
        }
    }

    /**
     * Prints given message to console
     *
     * @param msg - message to log
     */
    public static log(msg: string): void {
        console.log(msg);
    }
}
