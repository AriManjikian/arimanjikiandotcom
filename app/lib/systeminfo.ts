// src/utils/systemInfo.ts

export const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg')) {
        browser = 'Chrome';
        const match = ua.match(/Chrome\/([0-9.]+)/);
        version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        const match = ua.match(/Firefox\/([0-9.]+)/);
        version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
        const match = ua.match(/Version\/([0-9.]+)/);
        version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Edg')) {
        browser = 'Edge';
        const match = ua.match(/Edg\/([0-9.]+)/);
        version = match ? match[1] : 'Unknown';
    }

    return { browser, version };
};

export const getUserIp = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.log(error);
        return 'Unable to fetch IP';
    }
};

export const getSystemInfo = async (userIp: string): Promise<string[]> => {
    const now = new Date();
    const { browser, version } = getBrowserInfo();

    return [
        'System Information:',
        '==================',
        '',
        `IP Address:    ${userIp}`,
        `Local Time:    ${now.toLocaleString()}`,
        `UTC Time:      ${now.toUTCString()}`,
        `Timezone:      ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        `Browser:       ${browser} ${version}`,
        `Platform:      ${navigator.platform}`,
        `Language:      ${navigator.language}`,
        `Screen:        ${screen.width}x${screen.height}`,
        `Viewport:      ${window.innerWidth}x${window.innerHeight}`,
        `User Agent:    ${navigator.userAgent.substring(0, 80)}${navigator.userAgent.length > 80 ? '...' : ''}`,
        `CPU Cores:     ${navigator.hardwareConcurrency || 'Unknown'}`,
        `Touch Support: ${'ontouchstart' in window ? 'Yes' : 'No'}`,
        `Color Depth:   ${screen.colorDepth}-bit`,
        `Pixel Ratio:   ${window.devicePixelRatio.toFixed(2)}`,
    ];
};
