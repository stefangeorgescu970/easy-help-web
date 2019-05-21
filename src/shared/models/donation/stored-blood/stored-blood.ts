export class StoredBlood {
    id: number;
    group: string;
    rh: boolean;
    component: string;
    quantity: number;

    matches(rh, group): boolean {
        return true;
    }
}
