

export const testData = [
    { input: 'abcabcbb', output: 3, shouldPass: true },
    { input: 'bbbbb', output: 1, shouldPass: true },
    { input: 'pwwkew', output: 3, shouldPass: true },
    { input: 'au', output: 2, shouldPass: true },
    { 
        input: 'auasldjflnsnf;lnasd;faosdjfojwlknf;sdoihsdf sdpfjsodf;kanksd;lfnpaosjfd a[sdfaplsnkdfpasnfdkknsdf aosdfn9u98798sofd9hjn 392u3r9072390r739070937094    2093ur09327409lhsj;fjsodjflsjfpajspofopeaoigh;knasgpiuahfpihawefouihlkansdf;lknasdfsad fjajsfdlnaspdfnpashdgpy98u09u098093809729863986986y98tewf978ty87685764653417890987654321234567890yoi8745354254376489506-9857756767655756563454324324jhjhjgf', 
        output: 13, 
        shouldPass: true 
    }
];

export function lengthOfLongestSubstring(s: string): number {
    if (s.length < 2) return s.length;

    let startTmp = 0;
    let start = 0;
    let end = 1;

    for (let i = 1; i < s.length; i++) {
        for (let j = startTmp; j < i; j++) {
            if (s[j] === s[i]) {
                startTmp = j + 1;
                continue;
            }
        }
        if (end - start < i + 1 - startTmp) {
            start = startTmp;
            end = i + 1;
        }
    }
    return end - start;
};