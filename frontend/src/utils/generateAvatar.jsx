import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

const generateAvatar = (ava) => {
    const avatar = createAvatar(bottts, {
        seed: ava,
    });
    const avatarString = avatar.toDataUri();
    // const blob = new Blob([avatarString], { type: "image/svg+xml" });
    // const svgUrl = URL.createObjectURL(blob);
    return avatarString;
};

export default generateAvatar;
