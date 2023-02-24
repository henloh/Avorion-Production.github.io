# Avorion Production
[Overview](https://henloh.github.io/dist/index.html)

[Permutation Generator](https://henloh.github.io/dist/index.html#/permutation)

## Description
See what station buys which product and the other way round. 

# Permutation JSON Input
The title is plain text and generates a headline.
The parts can be one ore two level deep.
````
{
    "columns": [{
        "title": "",
        "parts": [[Varibale, SecondLvlVariable]]
    }],
    "data": {
        "Variable1": [{
            "SecondLvlVariable": " "
        }],
        "Variable2": ["SomeText"]
    }
}
````

### List of Products:
Acid, Acron Drug, Adhesive, Aluminium, Ammunition, Ammunition S, Ammunition M, Ammunition L, Antigrav Generator, Antigrav Unit, Beer, Body Armor, Book, Bio Gas, Carbon, Cattle, Chemicals, Coolant, Clothes, Coal, Cocoa, Coffee, Computation Mainframe, Conductor, Copper, Corn, Crystal, Chlorine, Diamond, Display, Dairy, Drill, Drone, Electron Accelerator, Electro Magnet, Electromagnetic Charge, Energy Container, Energy Generator, Energy Inverter, Energy Tube, Energy Cell, Explosive Charge, Fabric, Fertilizer, Fish, Food Bar, Food, Force Generator, Fruit, Fusion Core, Fusion Generator, Fuel, Fungus, Fluorine, Gem, Glass, Gun, Gold, Gauss Rail, Helium, Hydrogen, High Capacity Lens, High Pressure Tube, Industrial Tesla Coil, Jewelry, Leather, Liquor, Laser Compressor, Laser Head, Laser Modulator, Lead, Luxury Food, Medical Supplies, Metal Plate, Military Tesla Coil, Meat, Microchip, Mineral, Mining Robot, Morn Drug, Neutron Accelerator, Nitrogen, Neon, Nanobot, Oxygen, Oil, Ore, Paint, Proton Accelerator, Processor, Plankton, Platinum, Paper, Plant, Plasma Cell, Plastic, Potato, Power Unit, Protein, Raw Oil, Rice, Rift Research Data, Rocket, Rubber, Satellite, Scrap Metal, Semi Conductor, Servo, Sheep, Silicon, Solar Cell, Solar Panel, Spices, Steel, Steel Tube, Slave, Solvent, Silver, Toxic Waste, Targeting Card, Targeting System, Tea, Teleporter, Tools, Transformator, Turbine, Vegetable, Vehicle, War Robot, Warhead, Water, Wheat, Wine, Wire, Wood, Zinc

### List of Stations: 
Accelerator Factory, Aluminium Mine, Ammunition Factory 1, Ammunition Factory 2, Antigrav Generator Factory, Antigrav Unit Factory, Body Armor Factory, Book Factory, Brewery, Carbon Extractor 1, Carbon Extractor 2, Carbon Extractor 3, Carbon Extractor 4, Cattle Ranch 1, Cattle Ranch 2, Chemical Factory, Clothes Factory, Coal Mine, Cocoa Farm, Coffee Farm, Computation Mainframe Factory, Computer Component Factory, Conductor Factory, Copper Mine, Corn Farm, Crystal Farm, Dairy Farm, Display Factory, Distillery, Drill Factory, Drone Factory, Electro Magnet Factory, Electromagnetic Charge Factory, Energy Container Factory, Energy Generator Factory, Energy Inverter Factory, Energy Tube Factory, Explosive Charge Factory, Fabric Factory, Fertilizer Factory 1, Fertilizer Factory 2, Fish Farm, Food Bar Factory, Food Factory, Force Generator Factory, Fruit Farm, Fuel Factory, Fungus Farm, Fusion Core Factory, Fusion Generator Factory, Gas Collector 1, Gas Collector 2, Gas Collector 3, Gas Collector 4, Gauss Rail Factory, Glass Manufacturer, Gun Factory, High Capacity Lens Factory, High Pressure Tube Factory, Ice Mine, Jewelry Manufacturer 1, Jewelry Manufacturer 2, Laser Compressor Factory, Laser Head Factory, Laser Modulator Factory, Lead Mine, Luxury Food Factory, Meat Factory, Medical Supplies Factory, Metal Plate Factory, Microchip Factory, Mineral Extractor, Mining Robot Factory, Nanobot Factory, Noble Metal Mine 3, Noble Metal Mine 2, Noble Metal Mine 1, Oil Refinery, Oil Rig, Ore Mine, Paint Manufacturer, Paper Factory, Plankton Collector	, Plant Farm, Plasma Cell Factory, Plastic Manufacturer, Potato Farm, Power Unit Factory, Processor Factory, Protein Factory, Rice Farm, Rocket Factory, Rubber Factory, Satellite Factory, Scrap Metal Trader, Semi Conductor Manufacturer, Servo Factory, Sheep Ranch 1, Sheep Ranch 2, Silicon Mine, Solar Cell Factory, Solar Panel Factory, Solar Power Plant, Spices Farm, Steel Factory 1, Steel Factory 2, Steel Tube Factory, Targeting Card Factory, Targeting System Factory, Tea Farm, Teleporter Factory, Tesla Coil Factory, Tools Factory, Transformator Factory, Turbine Factory, Vegetable Farm, Vehicle Factory, War Robot Factory, Warhead Factory, Water Collector, Wheat Farm, Wine Factory, Wire Manufacturer, Wood Farm, Zinc Mine, Biotope, Casino, Equipment Dock, Habitat, Military Outpost, Repair Dock, Research Station, Rift Research Station, Resource Depot, Scrapyard, Shipyard, Planetary Trading Post, Travel Hub


###
The package.json->ui5.relevantFiles section allows the removal of the SAP resources from the repository. It has to contain every file the page needs to run for a small footprint. Enabler of this is the self-contained build of ui5 which creates the all mighty sap-ui-custom.js. 