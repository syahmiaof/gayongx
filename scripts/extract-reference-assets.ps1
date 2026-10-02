Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$source = Split-Path $root -Parent
$out = Join-Path $root 'public/images/reference'
$crops = @(
 @('ui website.jpg','hero-perak-demo.png',590,133,632,405),
 @('ui website.jpg','air-kuning-demo.png',420,609,590,135),
 @('ui admin.jpg','command-heritage-demo.png',765,72,735,193),
 @('ui website.jpg','songket-demo.png',1590,135,82,400),
 @('ui user.jpg','silat-sidebar-demo.png',0,605,271,237),
 @('ui user.jpg','member-portrait-demo.png',326,126,139,145),
 @('ui user.jpg','program-training-demo.png',384,775,92,64),
 @('ui user.jpg','program-championship-demo.png',384,852,92,64),
 @('ui user.jpg','program-seminar-demo.png',384,928,92,64),
 @('ui admin.jpg','perak-map-demo.png',1308,401,112,192)
)
foreach ($c in $crops) {
 $img = [System.Drawing.Bitmap]::FromFile((Join-Path $source $c[0]))
 $rect = [System.Drawing.Rectangle]::new($c[2],$c[3],$c[4],$c[5])
 $crop = $img.Clone($rect,$img.PixelFormat)
 $crop.Save((Join-Path $out $c[1]),[System.Drawing.Imaging.ImageFormat]::Png)
 $crop.Dispose(); $img.Dispose()
}

