import sys
import os
import math
from PIL import Image, ImageDraw, ImageFont
import tempfile
import subprocess

def generate_frame(text, progress, width=500, height=500):
    img = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(img)
    
    # Glow effect tanpa numpy
    glow = int(abs(math.sin(progress * math.pi)) * 40)
    if glow > 0:
        glow_img = Image.new('RGB', (width, height), (255, 255, max(215, 255-glow)))
        img = Image.blend(img, glow_img, 0.3)
        draw = ImageDraw.Draw(img)
    
    # Font
    try:
        font = ImageFont.truetype("/system/fonts/DroidSans-Bold.ttf", 72)
    except:
        try:
            font = ImageFont.truetype("/data/data/com.termux/files/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        except:
            font = ImageFont.load_default()
    
    # Wrap text
    words = text.split()
    lines = []
    current = ''
    for word in words:
        test = f"{current} {word}".strip()
        bbox = draw.textbbox((0,0), test, font=font)
        if bbox[2] > width - 60 and current:
            lines.append(current)
            current = word
        else:
            current = test
    if current:
        lines.append(current)
    
    # Alpha animasi
    alpha = min(1.0, progress * 3)
    color = int(255 * (1 - alpha))
    
    line_height = 90
    total_h = len(lines) * line_height
    start_y = (height - total_h) // 2
    
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0,0), line, font=font)
        text_w = bbox[2] - bbox[0]
        x = (width - text_w) // 2
        y = start_y + i * line_height
        draw.text((x, y), line, fill=(color, color, color), font=font)
    
    return img

def make_bratvid(text, output):
    fps = 24
    duration = 3
    total = fps * duration
    tmpdir = tempfile.mkdtemp()
    
    for i in range(total):
        progress = i / total
        frame = generate_frame(text, progress)
        frame.save(f"{tmpdir}/frame{i:04d}.png")
    
    subprocess.run([
        'ffmpeg', '-y',
        '-framerate', str(fps),
        '-i', f"{tmpdir}/frame%04d.png",
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-crf', '23',
        output
    ], capture_output=True)
    
    for f in os.listdir(tmpdir):
        os.remove(f"{tmpdir}/{f}")
    os.rmdir(tmpdir)

if __name__ == '__main__':
    text = sys.argv[1] if len(sys.argv) > 1 else 'brat'
    output = sys.argv[2] if len(sys.argv) > 2 else '/tmp/bratvid.mp4'
    make_bratvid(text, output)
    print(output)
