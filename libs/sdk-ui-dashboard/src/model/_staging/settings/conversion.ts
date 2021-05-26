// (C) 2021 GoodData Corporation
import { ISettings, IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";

/**
 * Given an object with settings that include user and workspace information, convert to a new object that
 * contains just the settings.
 *
 * @param userWorkspaceSettings - full object to strip of extra user and workspace data
 */
export function stripUserAndWorkspaceProps(userWorkspaceSettings: IUserWorkspaceSettings): ISettings {
    const {
        userId: _userId,
        locale: _locale,
        separators: _separators,
        workspace: _workspace,
        ...rest
    } = userWorkspaceSettings;

    return rest;
}
