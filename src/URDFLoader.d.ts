import { LoadingManager, Object3D } from 'three';
import { URDFRobot } from './URDFClasses';

interface MeshLoadDoneFunc {
    (mesh: Object3D, err?: Error): void;
}

interface MeshLoadFunc{
    (url: string, manager: LoadingManager, onLoad: MeshLoadDoneFunc): void;
}

interface RobotHookFunc{
    (robotNodes: Element[], linkMap: { [key: string]: Object3D }, jointMap: { [key: string]: Object3D }, curRobotObject3D: Object3D): void;
}

interface JointHookFunc{
    (curJointChildNode: Element, curJointObject3D: Object3D): void;
}

interface LinkHookFunc{
    (curLinkChildNode: Element, curLinkObject3D: Object3D): void;
}

interface LinkVisualHookFunc{
    (curLinkVisualNode: Element, curLinkVisualObject3D: Object3D): void;
}

interface LinkCollisionHookFunc{
    (curLinkCollisionNode: Element, curLinkCollisionObject3D: Object3D): void;
}

export default class URDFLoader {

    manager: LoadingManager;
    defaultMeshLoader: MeshLoadFunc;

    // options
    fetchOptions: Object;
    workingPath: string;
    parseVisual: boolean;
    parseCollision: boolean;
    packages: string | { [key: string]: string } | ((targetPkg: string) => string);
    loadMeshCb: MeshLoadFunc;
    robotHook: RobotHookFunc;
    jointHook: JointHookFunc;
    linkHook: LinkHookFunc;
    linkVisualHook: LinkVisualHookFunc;
    linkCollisionHook: LinkCollisionHookFunc;

    constructor(manager?: LoadingManager);
    loadAsync(urdf: string): Promise<URDFRobot>;
    load(
        url: string,
        onLoad: (robot: URDFRobot) => void,
        onProgress?: (progress?: any) => void,
        onError?: (err?: any) => void
    ): void;
    parse(content: string | Element | Document): URDFRobot;

}

export * from './URDFClasses';
